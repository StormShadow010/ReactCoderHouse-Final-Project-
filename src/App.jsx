import "./App.scss"
import { MainProviderContext } from "./providers/mainContext"
import { MainRouter } from "./router/MainRouter"


export const App = () => {
  return (
    <>
      <MainProviderContext>
        <MainRouter />
      </MainProviderContext>
    </>
  )
}
