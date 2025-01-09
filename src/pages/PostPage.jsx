import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function PostPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Post a New Request</h1>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20, marginBottom: 40, gap: 40}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15}}>
          Request Details
          <input 
            type='text'
            name='Title'
            id='title'
            placeholder='Request'
          />
          <input 
            type='text'
            name='Location'
            id='location'
            placeholder='Location'
          />
          <input 
            type='text'
            name='Body'
            id='body'
            placeholder='Request description'
          />
          <input 
            type='number'
            name='Suggested Compensation'
            id='compensation'
            defaultValue={0}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15}}>
          Tags (please select atleast 1)
            <label>
              <input
                type="checkbox"
                // checked={isChecked}
                // onChange={handleChange}
              />
              Cleaning
            </label>
            <label>
              <input
                type="checkbox"
                // checked={isChecked}
                // onChange={handleChange}
              />
              Transportation
            </label>
            <label>
              <input
                type="checkbox"
                // checked={isChecked}
                // onChange={handleChange}
              />
              Other
            </label>
          <input 
            type='text'
            name='Tags'
            id='tags'
            placeholder='Additional tags'
          />
        </div>
      </div>
      <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#C39BD3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Post
        </button>
    </div>
  )
}

export default PostPage;
