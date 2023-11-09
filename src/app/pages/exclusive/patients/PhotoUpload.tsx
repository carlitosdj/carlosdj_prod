import React, { useEffect, useState, useRef } from 'react'
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop'

import FileResizer from 'react-image-file-resizer';
import { Form } from 'react-bootstrap-v5';
import { useDebounceEffect } from '../../profile/useDebounceEffect';
import { canvasPreview } from '../../profile/canvasPreview';

type Props = {
  title: string
  croppedImage: string
  setCroppedImage: React.Dispatch<React.SetStateAction<any>>
  required?: boolean
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const PhotoUpload: React.FC<Props> = ({ croppedImage, setCroppedImage, title, required }) => {

  //const [croppedImage, setCroppedImage] = useState<any>('')

  const [imgSrc, setImgSrc] = useState('')

  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(9 / 16) //16 / 9
  const imgRef = useRef<HTMLImageElement>(null)
  const [image, setImage] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>()
  const [preview, setPreview] = useState<any>()

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
      setSelectedFile(e.target.files[0])

      //setIsSelected(true)
    } else {
      //setSelectedFile(e.target.files[0])
      setImgSrc('')
    }
  }
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
      //console.log("ei?")
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        //console.log("hum?")
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        ).then(() => {
          //console.log("FOI..?", previewCanvasRef)

          previewCanvasRef.current?.toBlob((file: any) => {
            console.log("FILE", file)
            try {
              FileResizer.imageFileResizer(
                file,
                800,
                800,
                "JPEG",
                100,
                0,
                (uri) => {
                  console.log("Nova imagem:", uri);
                  setCroppedImage(uri)
                },
                "blob"
              );


            } catch (error) {
              console.log("error", error)
            }
            // let url = URL.createObjectURL(file);
            // console.log("URL", url)
          }, "image/jpeg");

        })
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  useEffect(() => {

  }, [])

  return (
    <div>
      <Form.Group>
        <Form.Label>{title}</Form.Label>
        <Form.Control
          name='image'
          id='image'
          type='file'
          accept='image/*'
          onChange={onSelectFile}
          required={required?true:false}
        />
        <Form.Control.Feedback type='invalid'>Selecione um arquivo</Form.Control.Feedback>
      </Form.Group>
      <div>
        <label htmlFor="image">
          <a style={{ cursor: 'pointer' }}>
            {image && !imgSrc && <img
              alt=''
              src={image?.includes('https://') ? image : 'http://localhost:3000/upload/file/' + image}
              style={{ width: '100%' }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "https://labiopalatina.com.br/media/guestuser.jpg";
              }}
            />}
            {selectedFile && <img alt='' src={preview} style={{ width: '50%' }} />}
          </a>
        </label>
      </div>

      <div className='row g-5 gx-xxl-12'>
        <div className='col-6'>
          {!!imgSrc && (
            <div>
              <div>Posicione a foto</div>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                maxHeight={350}
                maxWidth={350}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>
          )}
        </div>
        <div className='col-6'>
          <div>
            {!!completedCrop && !!imgSrc && (
              <div>
                <div>Prévia</div>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>



  )

}
export { PhotoUpload }

