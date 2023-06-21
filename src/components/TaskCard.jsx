import Card from 'react-bootstrap/Card';
import SaveButton from './SaveButton'
import { Link } from 'react-router-dom';
import {getId} from '../functions'
import TaskDropdown from './TaskDropdown'
import '../css/taskCard.css'

function TaskCard({obj}) {
    console.log(obj)
  return (
    <Card className="mb-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{obj.item.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Status: {obj.status}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Last Updated: {obj.date}</Card.Subtitle>
        <div className="d-flex justify-content-between">
        <Link className="me-4" to={`/job-details/${getId(obj.item.job_id)}`} state={{ from: obj.item.job_id}}>View Details</Link>
        <TaskDropdown statusObj={obj}/>
        <SaveButton saveItem={obj.item}/>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;