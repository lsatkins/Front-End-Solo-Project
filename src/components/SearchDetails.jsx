import React from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import SaveButton from './SaveButton'


const SearchDetails = () => {
    const location = useLocation()
    const {from} = location.state
    console.log(from)
  const currentList = useSelector((state) => state.search.currentSearch);
  const searchedJob = currentList.find((job) => job.job_id === from);

  if (!searchedJob) {
    return <div>No job found with ID: {from}</div>;
  }

  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Card style={{ width: '50rem' }}>
        <Card.Body>
            <div className="d-flex justify-content-between">
                <Card.Title><h1>{searchedJob.title}</h1></Card.Title>
                <img height="100px" src={searchedJob.thumbnail} alt="" />
            </div>
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
          <Card.Text>
            <h5><b>Links:</b></h5> {Array.isArray(searchedJob.related_links) ? (
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
