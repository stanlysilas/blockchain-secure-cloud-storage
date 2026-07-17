import {
  File,
  FileText,
  FileCode2,
  Image,
  Film,
  Music,
  Archive,
  Package
} from 'lucide-react'

function FileIcon ({ fileName, className = 'w-20 h-20 text-blue-400' }) {
  const extension = fileName.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
    case 'md':
      return <FileText className={className} />

    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'webp':
    case 'svg':
      return <Image className={className} />

    case 'mp4':
    case 'avi':
    case 'mov':
    case 'mkv':
    case 'webm':
      return <Film className={className} />

    case 'mp3':
    case 'wav':
    case 'flac':
    case 'ogg':
      return <Music className={className} />

    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return <Archive className={className} />

    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'java':
    case 'cpp':
    case 'c':
    case 'py':
    case 'json':
    case 'xml':
    case 'html':
    case 'css':
      return <FileCode2 className={className} />

    case 'apk':
    case 'exe':
    case 'msi':
    case 'deb':
    case 'rpm':
      return <Package className={className} />

    default:
      return <File className={className} />
  }
}

export default FileIcon
