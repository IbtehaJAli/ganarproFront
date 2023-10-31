import React  from 'react';
import Dropdown from '../components/dropdown/Dropdown2';
import Button from '../components/button/Button';

import Tele from '../assets/icons/Tele';

const Playground = () => {


  return (
    <div>
      playing....
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <Dropdown />
      <Tele width="20" height="20" />


      <div className="mt-4">
        <Button customClassName="btn-medium me-4">Register</Button>
        <Button customClassName="btn-primary me-4">Register</Button>
        <Button customClassName="btn-primary me-4" btndisabled={true}>
          Register
        </Button>
        <Button customClassName="btn-outline-secondary-intel me-4">
          Register
        </Button>
        <Button
          customClassName="btn-outline-secondary-intel me-4"
          btndisabled={true}
        >
          Register
        </Button>
        <Button customClassName="btn-text-intel me-4">Register</Button>
        <Button customClassName="btn-text-intel me-4" btndisabled={true}>
          Register
        </Button>
        <Button customClassName="btn-primary btn-small me-4">Register</Button>
      </div>
      <div className="">
      </div>
    </div>
  );
};

export default Playground;
