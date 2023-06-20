import React from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

const SearchDetails = () => {
  const { id } = useParams();
  const currentList = useSelector((state) => state.search.currentSearch);
  const searchedJob = currentList.find((job) => job.job_id === id);

  if (!searchedJob) {
    return <div>No job found with ID: {id}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Card style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title><h1>{searchedJob.title}</h1></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <h5>{searchedJob.company_name}</h5>
          </Card.Subtitle>
          <Card.Subtitle className="mb-4 text-muted">
          <h5>{searchedJob.location}</h5>
          </Card.Subtitle>
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

          <Card.Link href="#">Save Job</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SearchDetails;
