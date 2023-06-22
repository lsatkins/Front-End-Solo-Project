import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {increment, decrement, incrementByNum, reset} from '../actions/incrementCount'
import {searchJobs, clickedDropDown} from '../slices/searchSlice'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import {shortDescription} from '../functions'
import '../css/search.css'
import { Link } from 'react-router-dom';
import {getId} from '../functions'
import SaveButton from './SaveButton'


const CountHooks = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const currentSearch = useSelector(state=>state.search.currentSearch)
    const searchList = useSelector(state=>state.search.searches)
    const currentSearchQuery = useSelector((state)=> state.search.currentSearchQuery)

    const [submittedSearch, setSubmittedSearch] = useState(currentSearchQuery)
    const [searchItems, setSearchItems] = useState((currentSearch === {}) ? '' : currentSearch)

    const keys = Object.keys(searchList)

    const handleSubmit = (e) => {
        e.preventDefault();

        setSearchItems('')

        if(searchList[searchTerm]){
            console.log('here')
            console.log(searchList[searchTerm])
            setSearchItems(searchList[searchTerm].results)
        }
        else{

            // Handle form submission logic here
            console.log('Form submitted with search term:', searchTerm);
            let data = {
                term: searchTerm
            }

            dispatch(searchJobs(data))
            setSearchItems(currentSearch)

        }
        setSubmittedSearch(searchTerm)
        setSearchTerm('')
            // You can perform additional actions, such as making an API call or updating state with the search term
      };

      useEffect(() => {
        setSearchItems(currentSearch)
         
      }, [currentSearch])
    
      const handleChange = (e) => {
        setSearchTerm(e.target.value);
      };

      const handleSearchOption = (item) => {
        setSearchTerm(item);
        console.log(setSearchTerm);
      
        const selectedSearch = searchList[item];
      
        if (selectedSearch) {
          setSearchItems(selectedSearch.results);
          console.log(selectedSearch.results)
          setSubmittedSearch(item);
        } else {
          // Handle form submission logic here
          console.log('Form submitted with search term:', item);
          let data = {
            term: item
          };
        }
        dispatch(clickedDropDown({
            query: item,
            array: selectedSearch.results
          }));
        setSearchItems(currentSearch);
      
        
      };
      

      const filteredItems = keys.filter((item) =>
        (searchTerm !== '') && (item.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      console.log('filtered', filteredItems)
      console.log(searchTerm)

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
    <div className="searchBorder">
    {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => <div onClick={()=> handleSearchOption(item)} className="searchOption" key={index}>{item}</div>)
                ) : (
                    <div></div>
                )}
    </div>
    {(submittedSearch) ? (
    <h3 className="text-center">Displaying jobs for: "{submittedSearch}"</h3>
) : <div></div>}
    <div className="row p-2 justify-content-center">{(Object.keys(searchItems).length !== 0) ? searchItems.map((item, index)=>{
        return (
            <Card className="col-4 m-2" style={{ width: '18rem' }} key={index}>
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-3">{item.title}</Card.Title>
                    <div className="row">
                        <div className="col-8 d-flex align-items-center pe-0">
                        <Card.Subtitle className="mb-2 text-muted text-center">{item.company_name}</Card.Subtitle>
                        </div>
                        <div className="col-4 ps-0">
                            <img width="50px" src={item.thumbnail} alt="" />
                        </div>
                    </div>
                    <Card.Subtitle className="mb-2 text-muted">{item.location}</Card.Subtitle>
                    <Card.Text>
                    <b>Description:</b> {shortDescription(item.description)}
                    </Card.Text>
                    <div className="mt-auto">
                    <Link className="me-4" to={`/job-details/${getId(item.job_id)}`} state={{ from: item.job_id}}>View Details</Link>
                    <SaveButton saveItem={item}/>
                    </div>
                </Card.Body>
            </Card>

        )
    }): null}</div>

    </>
  )
}

export default CountHooks
