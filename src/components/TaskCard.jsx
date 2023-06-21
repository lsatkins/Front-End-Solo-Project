import Card from 'react-bootstrap/Card';
import SaveButton from './SaveButton'

function TaskCard({obj}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{obj.item.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Status: {obj.status}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Last Updated: {obj.date}</Card.Subtitle>
        
        <Card.Link href="#">Card Link</Card.Link>
        <SaveButton saveItem={obj.item}/>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;