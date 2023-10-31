import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-icons/fa';
import '../pricing_slider/pricing_slider.css';

function PricingSlider({ price, send_sqft, sqft_saved, reset_sqft }) {
  const [sqft, setSqft] = useState(1); // Default square footage is 1 Sqft
  const [progress, setProgress] = useState(0.0);
  const [steps, setSteps] = useState(0.005); // Default
  const [firstTime, setFirstTime] = useState(true); // Default
  const isInitialMount = useRef(true);

  const [sliderMarkerTextStyles, setSliderMarkerTextStyles] = useState([
    { color: 'black', fontSize: '16px' },
    { color: 'black', fontSize: '16px' },
    { color: 'black', fontSize: '16px' },
    { color: 'black', fontSize: '16px' },
    { color: 'black', fontSize: '16px' },
  ]);


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (firstTime) {
      setSqft(sqft_saved);
      handleInputchange(sqft_saved);
      if(sqft_saved > 1 )
        setFirstTime(false);
    }
  },[sqft_saved]);

  useEffect(() => {
    setFirstTime(true);
    setSqft(1);
    handleInputchange(1);
  },[reset_sqft]);

  const handleInputchange = (sqft_parmas) => {
    if(sqft_parmas <= 4000){
      highlight_index(0);
      setSteps(0.005);
      setProgress((sqft_parmas/200).toFixed(2));

    }else if(sqft_parmas <= 31000) {
      highlight_index(1);
      setSteps(0.0013);
      let set_progress_cal = 19.1;
      let current_sqft = sqft_parmas;
      for (let i=4000; i <= 31000; i+=337.5){
        set_progress_cal += 0.25;
        if(i >= current_sqft){
          setProgress(set_progress_cal);
          break;
        }
      }

    }else if(sqft_parmas <= 150000) {
      highlight_index(2);
      setSteps(0.0004);
      let set_progress_cal = 39.9;
      let current_sqft = sqft_parmas;
      for (let i=31000; i <= 150000; i+=595){
        set_progress_cal += 0.1;
        if(i >= current_sqft){
          setProgress(set_progress_cal);
          break;
        }
      }

    }else if(sqft_parmas <= 500000) {
      highlight_index(3);
      setSteps(0.00016);
      let set_progress_cal = 59.99;
      let current_sqft = sqft_parmas;
      for (let i=150000; i <= 500000; i+=175){
        set_progress_cal += 0.01;
        if(i >= current_sqft){
          setProgress(set_progress_cal);
          break;
        }
      }

    }else if(sqft_parmas <= 3800000) {
      highlight_index(4);
      setSteps(0.0000263);
      let set_progress_cal = 79.999;
      let current_sqft = sqft_parmas;
      for (let i=500000; i <= 3800000; i+=6250){
        set_progress_cal += 0.25;
        if(i >= current_sqft){
          setProgress(set_progress_cal);
          break;
        }
      }
    }else if(sqft_parmas >= 3800000){
      highlight_index(4);
      setProgress(100);
    }
    send_sqft(sqft_parmas);
  };

  const handleSliderChange = (event) => {
    const newProgress = parseFloat(event.target.value).toFixed(4);
    setProgress(newProgress);
    if(progress <= 20){
      setSteps(0.005);
      highlight_index(0);
      setSqft(Math.floor(progress*200));

    }else if(progress <= 39.3703) {
      setSteps(0.0013);
      highlight_index(1);
      if(progress < 25){
        setSqft(Math.floor(progress*progress*10*1.001));
      }else{
        setSqft(Math.floor(progress*progress*10*2));
      }

    }else if(progress <= 59.7618) {
      setSteps(0.0004);
      highlight_index(2);
      if(progress < 45) {
        setSqft(Math.floor(progress*progress*10*2));
      } else {
        setSqft(Math.floor(progress*progress*42*1.001));
      }

    }else if(progress <= 80) {
      setSteps(0.00016);
      highlight_index(3);
      if(progress < 65 ) {
        setSqft(Math.floor(progress*progress*43));
      }else {
        setSqft(Math.floor(progress*6250));
      }

    }else if(progress <= 100) {
      setSteps(0.00004);
      highlight_index(4);
      if(progress < 84){
        setSqft(Math.floor(progress*6250));

      } else if(progress < 87) {
        setSqft(Math.floor(progress*7000));

      } else if(progress < 92) {
        setSqft(Math.floor(progress*8000));

      } else {
        setSqft(Math.floor(progress*progress*progress));
      }

    }
    send_sqft(sqft);
  };

  const highlight_index = (index) => {
    const updatedTextStyles = sliderMarkerTextStyles.map((style, i) => {
      if (i === index) {
        return { color: 'blue', fontSize: '18px' };
      } else {
        return { color: 'black', fontSize: '16px' };
      }
    });

    setSliderMarkerTextStyles(updatedTextStyles);
  };

  const formattedResult =
    sqft*price > 0.99
      ? (sqft*(price? price : 0.0))
        .toLocaleString('en-US', { style: 'currency',currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0})
      : (sqft*(price? price : 0.0)).toLocaleString('en-US', { style: 'currency',currency: 'USD'});

  return (
    <Container className="mt-4">
      <Form.Group controlId="sqftSlider">
        <div className='d-flex justify-content-center' style={{fontSize:'15px'}}>
          <div className='d-flex flex-column align-items-center m-5'>
            <Form.Control controlId="sqftInput"
              className='mb-2'
              type='number'
              step={1}
              style={{fontSize:'18px', fontStyle:'bold', textAlign:'center', maxWidth:'220px', borderRadius:'6px'}}
              value={sqft}
              onChange={(e)=> {
                if(parseFloat(e.target.value) > 0){
                  setSqft(parseInt(e.target.value));
                } else {
                  setSqft(0);
                  handleInputchange(0);
                }
              }}
              onKeyUp={(e) => {
                handleInputchange(parseInt(e.target.value));
              }}
            />
            <Form.Label className="mb-2" style={{ textAlign:'center' }} >Square Feet</Form.Label>
          </div>
          <div className="slider-divider"></div>
          <div className='d-flex flex-column align-items-center m-5'>
            <Form.Label className="mb-2" style={{ fontSize:'18px', textAlign:'center', width:'100%' }}><b>{formattedResult}</b></Form.Label>
            <Form.Label className="mb-2" style={{ textAlign:'center', width:'100%' }}>Estimate cleaning price</Form.Label>
          </div>
        </div>
        <input
          type="range"
          min={0.005}
          max={100}
          step={steps}
          value={progress}
          onChange={handleSliderChange}
          onDragEnd={handleSliderChange}
          className="slider"
        />
        <div className="slider-markers-lines">
          <div className="slider-marker" style={{ left: '20.65%', height:'10px', backgroundColor:'black', width:'1px' }}></div>
          <div className="slider-marker" style={{ left: '39.6%', height:'10px', backgroundColor:'black', width:'1px' }}></div>
          <div className="slider-marker" style={{ left: '59.8%', height:'10px', backgroundColor:'black', width:'1px' }}></div>
          <div className="slider-marker" style={{ left: '79.2%', height:'10px', backgroundColor:'black', width:'1px' }}></div>
        </div>
        <div className="slider-markers" style={{marginTop:'32px'}}>
          <div className='slider-maker-text' style={{ left: '10%', ...sliderMarkerTextStyles[0] }}>
            <div>1 - 4,000</div>
            <div style={{ fontSize:'16px' }}><b>Extra Small</b></div>
          </div>
          <div className='slider-maker-text' style={{ left: '30%', ...sliderMarkerTextStyles[1] }}>
            <div>4,001 - 31,000</div>
            <div style={{fontSize:'16px'}}><b>Small</b></div>
          </div>
          <div className='slider-maker-text' style={{ left: '50%', ...sliderMarkerTextStyles[2] }}>
            <div>31,001 - 150,000</div>
            <div style={{fontSize:'16px'}}><b>Medium</b></div>
          </div>
          <div className='slider-maker-text' style={{ left: '70%', ...sliderMarkerTextStyles[3] }}>
            <div>150,001 - 500,000</div>
            <div style={{fontSize:'16px'}}><b>Large</b></div>
          </div>
          <div className='slider-maker-text' style={{ left: '90%', ...sliderMarkerTextStyles[4] }}>
            <div>500,001 - 1,000,000</div>
            <div style={{fontSize:'16px'}}><b>Extra Large</b></div>
          </div>
        </div>
      </Form.Group>
    </Container>
  );
}

export default PricingSlider;
