import AppKit
import Foundation
import UniformTypeIdentifiers

struct IconSpec {
    let path: String
    let size: CGFloat
    let paddingRatio: CGFloat
}

func makeDirectoryIfNeeded(_ path: String) throws {
    let url = URL(fileURLWithPath: path)
    try FileManager.default.createDirectory(at: url, withIntermediateDirectories: true)
}

func renderIcon(from source: CGImage, size: CGFloat, paddingRatio: CGFloat) -> CGImage? {
    let pixelSize = Int(size)
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    guard let context = CGContext(
        data: nil,
        width: pixelSize,
        height: pixelSize,
        bitsPerComponent: 8,
        bytesPerRow: pixelSize * 4,
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else {
        return nil
    }

    context.setFillColor(NSColor.clear.cgColor)
    context.fill(CGRect(x: 0, y: 0, width: size, height: size))

    let inset = size * paddingRatio
    let drawRect = CGRect(x: inset, y: inset, width: size - (inset * 2), height: size - (inset * 2))

    context.saveGState()
    let clipPath = CGPath(ellipseIn: drawRect, transform: nil)
    context.addPath(clipPath)
    context.clip()
    context.interpolationQuality = .high
    context.draw(source, in: drawRect)
    context.restoreGState()

    return context.makeImage()
}

func writePNG(_ image: CGImage, to path: String) throws {
    let destinationURL = URL(fileURLWithPath: path) as CFURL
    guard let destination = CGImageDestinationCreateWithURL(destinationURL, UTType.png.identifier as CFString, 1, nil) else {
        throw NSError(domain: "IconWriter", code: 1, userInfo: [NSLocalizedDescriptionKey: "Failed to create image destination for \(path)"])
    }
    CGImageDestinationAddImage(destination, image, nil)
    if !CGImageDestinationFinalize(destination) {
        throw NSError(domain: "IconWriter", code: 2, userInfo: [NSLocalizedDescriptionKey: "Failed to finalize image destination for \(path)"])
    }
}

guard CommandLine.arguments.count >= 3 else {
    fputs("Usage: swift generate_web_icons.swift <source-image> <web-root>\n", stderr)
    exit(1)
}

let sourcePath = CommandLine.arguments[1]
let webRoot = CommandLine.arguments[2]

guard let sourceImage = NSImage(contentsOfFile: sourcePath) else {
    fputs("Could not load source image: \(sourcePath)\n", stderr)
    exit(1)
}

var proposedRect = CGRect(origin: .zero, size: sourceImage.size)
guard let sourceCGImage = sourceImage.cgImage(forProposedRect: &proposedRect, context: nil, hints: nil) else {
    fputs("Could not create CGImage from source image.\n", stderr)
    exit(1)
}

let specs = [
    IconSpec(path: "\(webRoot)/favicon-32.png", size: 32, paddingRatio: 0.12),
    IconSpec(path: "\(webRoot)/apple-touch-icon.png", size: 180, paddingRatio: 0.10),
    IconSpec(path: "\(webRoot)/icon-192.png", size: 192, paddingRatio: 0.10),
    IconSpec(path: "\(webRoot)/icon-512.png", size: 512, paddingRatio: 0.10),
    IconSpec(path: "\(webRoot)/assets/apple-touch-icon.png", size: 180, paddingRatio: 0.10),
    IconSpec(path: "\(webRoot)/assets/icon-192.png", size: 192, paddingRatio: 0.10),
    IconSpec(path: "\(webRoot)/assets/icon-512.png", size: 512, paddingRatio: 0.10),
    IconSpec(path: "\(webRoot)/assets/icon-192-maskable.png", size: 192, paddingRatio: 0.18),
    IconSpec(path: "\(webRoot)/assets/icon-512-maskable.png", size: 512, paddingRatio: 0.18),
]

do {
    try makeDirectoryIfNeeded("\(webRoot)/assets")

    for spec in specs {
        guard let rendered = renderIcon(from: sourceCGImage, size: spec.size, paddingRatio: spec.paddingRatio) else {
            throw NSError(domain: "IconWriter", code: 3, userInfo: [NSLocalizedDescriptionKey: "Failed to render icon for \(spec.path)"])
        }
        try writePNG(rendered, to: spec.path)
        print("Generated \(spec.path)")
    }
} catch {
    fputs("\(error.localizedDescription)\n", stderr)
    exit(1)
}
