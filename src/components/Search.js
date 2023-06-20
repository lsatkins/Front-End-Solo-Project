import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {increment, decrement, incrementByNum, reset} from '../actions/incrementCount'
import {searchJobs} from '../slices/searchSlice'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import {shortDescription} from '../functions'
import '../css/search.css'
import { Link } from 'react-router-dom';


const CountHooks = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const currentSearch = useSelector(state=>state.search.currentSearch)
    const searchList = useSelector(state=>state.search.searches)

    const [searchItems, setSearchItems] = useState(currentSearch)

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(searchList[searchTerm])

        if(searchList[searchTerm]){
            setSearchItems(searchList[searchTerm])
        }
        else{

            // Handle form submission logic here
            console.log('Form submitted with search term:', searchTerm);
            let data = {
                term: searchTerm
            }

            console.log('is this happening?')
            dispatch(searchJobs(data))
            setSearchItems(currentSearch)

        }
            // You can perform additional actions, such as making an API call or updating state with the search term
      };

      useEffect(() => {
         
      }, [searchItems])
      console.log(searchItems)
    
      const handleChange = (e) => {
        setSearchTerm(e.target.value);
      };

  const dispatch = useDispatch()   //store.dispatch(fun)

  
  
  return (
    <>
    <form onSubmit={handleSubmit}>
        <InputGroup size="lg mt-2">
            <InputGroup.Text id="inputGroup-sizing-lg">Search Jobs</InputGroup.Text>
            <Form.Control
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="web developer Alabama"
                value={searchTerm}
                onChange={handleChange}
            />
        </InputGroup>
    </form>

    <div className="row p-2">{searchItems.map((item, index)=>{
        return (
            <Card className="col-4 m-2" style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title className="mb-3">{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{item.company_name}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{item.location}</Card.Subtitle>
                    <Card.Text>
                    <b>Description:</b> {shortDescription(item.description)}
                    </Card.Text>
                    <Link className="me-4" to={`/job-details/${item.job_id}`}>View Details</Link>
                    <Card.Link href="#">Save Job</Card.Link>
                </Card.Body>
            </Card>

        )
    })}</div>

    </>
  )
}

export default CountHooks
