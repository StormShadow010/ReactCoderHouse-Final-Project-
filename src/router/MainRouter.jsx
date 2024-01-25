import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { ItemDetailIndividual } from '../pages/ItemDetail/ItemDetailIndividual'
import { Category } from '../pages/Category/Category'
import { CreateItem } from '../pages/CreateItem/CreateItem'
import { BriefCheckout } from '../pages/BriefCheckout/BriefCheckout'


export const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateItem />} />
                <Route path='/brief' element={<BriefCheckout />} />
                <Route path='/item/:id' element={<ItemDetailIndividual />} />
                <Route path='/category/:category' element={<Category />} />
                {/* <Route path='/login' element={<LogIn />} /> */}
                {/* <Route path='/news' element={<News />} /> */}
            </Routes>
        </BrowserRouter>
    )
}
