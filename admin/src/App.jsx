// // App.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import AddItems from './components/AddItems/AddItems';
// import Orders from './components/Orders/Orders';
// import ListItems from './components/ListItems/ListItems';
// import AdminDashboard from './components/AdminDashboard/AdminDashboard';
// import Visitors from './components/AdminDashboard/Visitors';
// import VisitorsLocation from './components/AdminDashboard/VisitorsLocation';
// import "leaflet/dist/leaflet.css";
// import Users from './components/AdminDashboard/User';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<AdminDashboard />}/>
//       <Route path="/list" element={<ListItems />} />
//       <Route path="/orders" element={<Orders />} />
//        <Route path="/admindashboard" element={<AdminDashboard/>}/>
//       <Route path="/visitors" element={<Visitors/>}/>
//       <Route path="/visitorslocation" element={<VisitorsLocation/>}/>
//       <Route path="/user" element={<Users/>}/>

//     </Routes>

//   );
// }
// export default App;


// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddItems from './components/AddItems/AddItems';
import Orders from './components/Orders/Orders';
import ListItems from './components/ListItems/ListItems';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Visitors from './components/AdminDashboard/Visitors';
import VisitorsLocation from './components/AdminDashboard/VisitorsLocation';
import User from './components/AdminDashboard/User';
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Routes>
      {/* Parent Route */}
      <Route path="/" element={<AdminDashboard />}>
        {/* Nested routes inside AdminDashboard */}
        <Route index element={<Orders />} /> {/* Default component when opening dashboard */}
        <Route path="list" element={<ListItems />} />
        <Route path="orders" element={<Orders />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="visitorslocation" element={<VisitorsLocation />} />
        <Route path="user" element={<User />} />
      </Route>
      <Route path="/additems" element={<AddItems />} />

    </Routes>
  );
}

export default App;
