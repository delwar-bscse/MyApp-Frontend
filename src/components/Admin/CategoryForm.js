import React from 'react';

const CategoryForm = ({handleSubmit, value, setValue}) => {

  return (
    <>
        <form onSubmit={handleSubmit} className='d-flex'>
            <input type="text" className="form-control" placeholder='Enter new category' value={value} onChange={(e)=>setValue(e.target.value)}/>
            <button type="submit" className="btn btn-primary ms-1">Submit</button>
        </form>
    </>
  );
};

export default CategoryForm;
