import React, { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../design/layout/core'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { useDispatch } from 'react-redux'
import { loadComponentRequest } from '../../../store/ducks/component/actions'
import Loading from '../../design/loading'
import { Form } from 'react-bootstrap-v5'
import { Document, Page, pdfjs } from 'react-pdf';
import { SizeMe } from 'react-sizeme'

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

//import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
// import Vimeo from '@u-wave/react-vimeo'
// import { right } from '@popperjs/core'
// const MOMENT = require('moment')
//import { useWindowWidth } from '@wojtekmaj/react-hooks';


type ParamTypes = {
  id: string
}

const ArticleReadPage: FC<React.PropsWithChildren<unknown>> = () => {
  // const me = useSelector((state: ApplicationState) => state.me)
  const component = useSelector((state: ApplicationState) => state.component)
  const dispatch = useDispatch()
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [loadingPDF, setLoadingPDF] = useState(true)
  const [range, setRange] = useState(0)
  const [zoom, setZoom] = useState(100)
  //const width = useWindowWidth();

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setLoadingPDF(false)
  }

  const changeRange = (e:any) => {
    console.log(e)
    let pageNum = Math.floor((e * numPages!) / 100)
    console.log("pageNum", pageNum)
    // setPageNumber(pageNum)
    if (pageNum < 1)
      setPageNumber(1)
    else
      setPageNumber(pageNum)
      
    setRange(e)
    //setRange(e)
  }

  const changeZoom = (e:any) => {
    console.log("oi")
    setZoom(e)
  }

  //const intl = useIntl()
  let {id} = useParams<ParamTypes>() //id do módulo
  useEffect(() => {
    dispatch(loadComponentRequest(id!.toString(),'asc'))
  }, [])

  console.log("component", component)
  // let extra_img = component.data?.extras?.filter((extra: any) => extra.key_extra === 'img')[0];
  let extra_file = component.data?.extras?.filter((extra: any) => extra.key_extra === 'file')[0];
  const nextPage = () => {
    setPageNumber(pageNumber+1)
    setRange(Math.round((pageNumber / numPages!) * 100))
  }
  const previousPage = () => {
    setPageNumber(pageNumber-1)
    setRange(Math.round((pageNumber / numPages!) * 100))
  }
          
  // let img = '1652141135752-logo.png'
  // if (extra_img?.value_extra)
  //   img = extra_img?.value_extra

  let filePDF = ''
    if (extra_file?.value_extra)
      filePDF = extra_file?.value_extra
      
  //let now = Math.round((pageNumber / numPages!) * 100);

  
  return (
    <>
      {/* begin::Row */}
      {/* <h3 className='page-title mt-0 mb-5'>{intl.formatMessage({ id: 'PAGE.BOOKREAD' })}</h3> */}
      {/* <h3 className='page-title mt-0 mb-5'>Treinamentos</h3> */}
          <nav>
          <button className='btn btn-sm btn-primary' disabled={pageNumber <= 1} onClick={previousPage}>PAGINA ANTERIOR</button>
          &nbsp;&nbsp;
          <button className='btn btn-sm btn-primary' disabled={pageNumber >= numPages!} onClick={nextPage}>PRÓXIMA PAGINA</button>
          &nbsp;&nbsp;
          </nav>
          
          <br/><br/>
          <div className='row'>
            <div className='col-3 col-md-1'>
              Progresso
            </div>
            <div className='col-6 col-md-10'>
              {/* <ProgressBar now={now} label={`${now}%`} /> */}
              <Form.Range 
                defaultValue={range} 
                value={range}
                onChange={e => changeRange(e.target.value)} 
              />
            </div>
            <div className='col-3 col-md-1'>
                <p>
                  {pageNumber} de {numPages}
                </p>
            </div>


          </div>
          
          {/* {range} */}
          
          {/* {component.loading && <Loading/>} */}

      <div className='row gy-5 g-xl-8' style={{ height: 'auto'}}>
        {/* {id} */}
        
        {/* <div className='col-xxl-3'>
          TESTE
          {img}
        </div> */}
        
        <div className='col-xxl-12' style={{ height: 'auto'}}>

              {(loadingPDF || component.loading) && <Loading/>}
              
             
              

              {/* <SizeMe
                monitorHeight
                refreshRate={128}
                refreshMode={"debounce"}
                render={({ size }:any) => ( */}
                <SizeMe
                  monitorHeight
                  //refreshRate={128}
                  //refreshMode={"debounce"}
                >
                  {({ size }) => (

                    
                  <div style={{ height: 'auto'}} >
                    <div className='row '>
                      <div className='col-1 d-none d-lg-block'>
                        Zoom
                      </div>
                      <div className='col-10 d-none d-lg-block'>
                        <Form.Range 
                          defaultValue={zoom} 
                          value={zoom}
                          onChange={e => changeZoom(e.target.value)} 
                          
                        /> 
                      </div>
                      <div className='col-1 d-none d-lg-block'>
                        {zoom}%
                      </div>
                    </div>
                    <br/>
                      {/* {zoom} */}
                      
                    {/* h: {size.height} <br/>
                    w: {size.width}<br/> */}
                    <Document 
                      //renderMode='no-cors'
                      file={'https://labiopalatina.com.br/files/' + filePDF} 
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={console.log}
                      
                      

                      //onLoadSuccess={onDocumentLoadSuccess}
                      >
                      <Page 
                        pageNumber={pageNumber} 
                        renderTextLayer={false}
                        //width={size.width ? size.width : 1} 
                        //width={zoom ? size.width ? size.width : zoom : 1 }
                        width={zoom ? (zoom/100)*size.width! : size.width! }
                        
                        
                        //scale={1}
                      />
                    </Document>

                  </div>
                )}
              </SizeMe>
              
              

        </div>
      </div>
      
      {/* end::Row */}
    </>
  )
}

const ArticleRead: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  const component = useSelector((state: ApplicationState) => state.component)

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.ARTICLEREAD' }) + ' - ' + component.data.name}</PageTitle>
      {/* <PageTitle breadcrumbs={[]}>{component.data.name}</PageTitle> */}
      <ArticleReadPage />
    </>
  )
}
export { ArticleRead }
