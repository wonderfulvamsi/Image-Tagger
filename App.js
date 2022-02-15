import TaggingPg from './TaggingPg';
import UploadPg from './UploadPg';
import { BrowserRouter as Router, Routes, Route, Switch, Link } from 'react-router-dom';
import HomePg from './HomePg';
import itemData from './DB';
import React from 'react';

function App() {

  const [uploads, SetUploads] = React.useState(itemData);
  console.log(uploads);
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePg />} />
          <Route path='/uploading' element={<UploadPg uploads={uploads} setUploads={SetUploads} />} />
          <Route path='/tagging' element={<TaggingPg uploads={uploads} setUploads={SetUploads} />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
