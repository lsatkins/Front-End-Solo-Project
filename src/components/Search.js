import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {increment, decrement, incrementByNum, reset} from '../actions/incrementCount'
import {searchJobs, saveJob, removeJob} from '../slices/searchSlice'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import {shortDescription} from '../functions'
import '../css/search.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {getId} from '../functions'


const CountHooks = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const currentSearch = useSelector(state=>state.search.currentSearch)
    const searchList = useSelector(state=>state.search.searches)
    const saved = useSelector((state)=> state.search.saved)


    const [searchItems, setSearchItems] = useState(currentSearch)

    const handleSubmit = (e) => {
        e.preventDefault();

        setSearchItems('')

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
            console.log('currentSearch',currentSearch)
            setSearchItems(currentSearch)

        }
            // You can perform additional actions, such as making an API call or updating state with the search term
      };

      const handleSaveJob = (item) => {
        console.log('hello')
        dispatch(saveJob(item))
      }
      const handleRemoveJob = (item) => {
        console.log('hello')
        let index = findIndex(item)
        dispatch(removeJob(index))
      }

      useEffect(() => {
        setSearchItems(currentSearch)
         
      }, [currentSearch])
      console.log(searchItems)
    
      const handleChange = (e) => {
        setSearchTerm(e.target.value);
      };

      const findIndex = (obj) => {
        const index = saved.findIndex((item) => item.item.job_id === obj.job_id);
        console.log('item', saved[0].item)
        console.log('obj', obj)
        console.log(index)
        return index;
      }

      const checkIfSaved = (obj) => {
        for(const item of saved){
            if(item.item.job_id === obj.job_id){
                return true;
            }  
        }
        return false
    }

  const dispatch = useDispatch()   //store.dispatch(fun)

  
  
  return (
    <>
    <form onSubmit={handleSubmit}>
        <InputGroup size="lg mt-2">
            <InputGroup.Text id="inputGroup-sizing-lg">Search Jobs</InputGroup.Text>
            <Form.Control
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                placeholder='example: "web developer Tuscaloosa, AL"'
                value={searchTerm}
                onChange={handleChange}
            />
        </InputGroup>
    </form>
    <div className="text-center">Displaying jobs for: "{searchTerm}"</div>

    <div className="row p-2">{searchItems.length ? searchItems.map((item, index)=>{
        return (
            <Card className="col-4 m-2" style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title className="mb-3">{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{item.company_name}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{item.location}</Card.Subtitle>
                    <Card.Text>
                    <b>Description:</b> {shortDescription(item.description)}
                    </Card.Text>
                    <Link className="me-4" to={`/job-details/${getId(item.job_id)}`} state={{ from: item.job_id}}>View Details</Link>
                    {checkIfSaved(item) ? (
                        <Button onClick={()=>handleRemoveJob(item)} variant="danger">Unsave</Button>):(
                        <Button onClick={()=>handleSaveJob(item)} variant="primary">Save Job</Button>    
                    )}
                </Card.Body>
            </Card>

        )
    }): null}</div>

    </>
  )
}

export default CountHooks
