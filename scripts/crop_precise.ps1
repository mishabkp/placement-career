Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\kpmiz\Desktop\Finalyear-Project\public\animation\full_frames.jpg"
$outDir = "c:\Users\kpmiz\Desktop\Finalyear-Project\public\animation"

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Host "Source: $($img.Width) x $($img.Height)"

# Crop strictly inside the card rounded borders
$p1 = @{ x = 22; y = 108; w = 296; h = 540 }
$p2 = @{ x = 362; y = 108; w = 296; h = 540 }
$p3 = @{ x = 702; y = 108; w = 296; h = 540 }

$panels = @($p1, $p2, $p3)

for ($i = 0; $i -lt 3; $i++) {
    $p = $panels[$i]
    $rect = New-Object System.Drawing.Rectangle($p.x, $p.y, $p.w, $p.h)
    
    $cropped = New-Object System.Drawing.Bitmap($p.w, $p.h)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $p.w, $p.h)
    $g.DrawImage($img, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $frameNum = $i + 1
    $outPath = "$outDir\frame$frameNum.png"
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Save("$outDir\frame$frameNum.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Exported borderless frame $frameNum"
}

$img.Dispose()
Write-Host "Done precision borderless cropping!"
