import React, { Suspense, lazy } from 'react'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import Header from '@com/Header'
import { Spin } from './stories/Spin/Spin'
import classnames from 'classnames'
import { classGenerator } from './utils'
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from './components/CodeBlock'

const Home = lazy(() => import('@/pages/Home'))
const Components = lazy(() => import('@/pages/Components'))
// const Documentation = lazy(() => import(/* webpackChunkName: "Documentation" */ './pages/documentation'))

const mainClass = classGenerator('main', 'doc')

const verReg = /(\d+\.){2}x/

const App = () => {
  // const [versions, setVersions] = useState([])
  // const [lastPath] = useState({ pathname: history.location.pathname })
  // const [, setUpdate] = useState()

  const components = {
    pre: props => <div className='123' {...props} />,
    code: CodeBlock
  }

  return (
    <MDXProvider components={components}>
      <BrowserRouter basename='/'>
        <div>
          <Header />
            <Suspense fallback={<Spin />}>
              <Routes>
                <Route path="/index" Component={Home} />
                {/* <Route path="/documentation" component={Documentation} /> */}
                <Route path="/components/:name" Component={Components} />
                <Route path="/components" element={<Navigate to="/components/Button"/>} />
                <Route path="*" element={<Navigate to="/index"/>} />
              </Routes>
            </Suspense>
        </div>
      </BrowserRouter>
    </MDXProvider>
    
  )
}

export default App
