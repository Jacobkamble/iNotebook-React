import React from 'react'

export default function Home() {
  return (
    <>
      <div className="container " style={{width:"70vw"}}>
        <h3>Add Note</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <textarea type="" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <h3>Your Notes</h3>
      </div>
    </>
  )
}
