import React from 'react';
import ListCafe from  './pages/listCafe';
import DetailCafe from './pages/detailsCafe';
import AddCafe from './pages/addCafe';
import { CategoryContext, CategoryType} from './Contexts/contextApp';

const category: CategoryType = {
  category: 'hot',
};

function App() {
  
  const [page, setPage] = React.useState('List');

  const changePage = (new_page: string) => {
    setPage(new_page);
    console.log(new_page)
  }

  return (
    <>
     <CategoryContext.Provider value={category }>
        { page === 'List' ?  <ListCafe changeRoute={changePage} />: null}
        { page === 'Details' ?  <DetailCafe changeRoute={changePage} />: null}
        { page === 'Add' ?  <AddCafe changeRoute={changePage} />: null}
      </CategoryContext.Provider>
    </>
  );
}

export default App;
