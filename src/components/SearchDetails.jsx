import React from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import SaveButton from './SaveButton'
import '../css/details.css'


const SearchDetails = () => {
    const location = useLocation()
    const {from} = location.state
    console.log('from',from)
  const currentList = useSelector((state) => state.search.currentSearch);
  const saved = useSelector((state=> state.search.saved))
  let searchedJob = currentList.find((job) => job.job_id === from);
  if(searchedJob){
    console.log('job found in currentList')
  }
  else{
    console.log('searching through saved')
    console.log(saved)
    for(let entry of saved){
        if(entry.item.job_id === from){
            searchedJob = entry.item
        }
    }
  }

  if (!searchedJob) {
    return <div>No job found with ID: {from}</div>;
  }

  return (

    <div className='details' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Card className="border-dark border-2" style={{ width: '50rem' }}>
        <Card.Body>
            <div className="d-flex justify-content-center">
                <Card.Title><h1>{searchedJob.title}</h1></Card.Title>
            </div>
            <div className="underTitle">
            <div className="locationAndPic d-flex justify-content-between">
                <div className="location">
          <Card.Subtitle className="mb-2 text-muted">
            <h5>{searchedJob.company_name}</h5>
          </Card.Subtitle>
          <Card.Subtitle className="mb-4 text-muted">
          <h5>{searchedJob.location}</h5>
          </Card.Subtitle>
          <ul>
            {searchedJob.extensions.map(item=>{
                return <li>{item}</li>
            })}
          </ul>
          </div>
          <img className='image' src={searchedJob.thumbnail} alt="" />
          </div>
          <Card.Text>
            <h5><b>Description:</b></h5> {searchedJob.description}
          </Card.Text>
          <Card.Text>
          <h5><b>Job Highlights:</b></h5> {Array.isArray(searchedJob.job_highlights) ? (
                searchedJob.job_highlights.map((item) => (
                <div className="m-4" key={item.title}>
                    <b>{item.title}:</b>
                    {Array.isArray(item.items) &&
                    item.items.map((subItem) => (
                        <li key={subItem}>{subItem}</li>
                    ))}
                </div>
                ))
            ) : null}
          </Card.Text>
          </div>
          <Card.Text>
            <h5><b className="links">Links:</b></h5> {Array.isArray(searchedJob.related_links) ? (
                searchedJob.related_links.map((item) => (
                <Card.Link key={item.text} href={item.link}>{item.text}</Card.Link>
                ))
            ) : null}
          </Card.Text>

          <SaveButton saveItem={searchedJob}/>
        </Card.Body>
      </Card>
    </div>
     );
};

export default SearchDetails;
