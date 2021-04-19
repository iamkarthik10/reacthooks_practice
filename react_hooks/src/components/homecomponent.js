import axios from 'axios';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const HomeComponent = (props) =>{

    var reduxState = useSelector(state => state.reducer)
    const URL_BACKEND = 'http://127.0.0.1:8000'
    var [bucketList, updateBucketList] = useState();
    var [createBucket, setCreateBucket] = useState({bucket_name:'',})

    function renderTemplate(){
        return(
            <div className='bucket-sub-container'>
                {bucketList && bucketList.length>0?
                <div className='bucket-list-container'>
                    {bucketList.map(item =>(
                        <div key={item.id}>
                            <Link to={`/todoView/${item.id}`}>
                                <label>{item.bucket_name}</label>
                            </Link>
                        </div>
                    ))}
                </div>
                
                :<div>No Buckets available yet</div>}
            </div>
        )
    }

    useEffect(()=>{
        async function getBucketsList(){
           let resp =  await axios.get(`${URL_BACKEND}/userbucket/${reduxState.id}`)
            .then(res =>res.data)
            updateBucketList(resp)
        }
        getBucketsList()
    },[reduxState.id])

    function handleBucketName(event){
        setCreateBucket({...createBucket,bucket_name:event.target.value})
    }

    async function handleBucketCreate(){
        let resp = await axios.post(`${URL_BACKEND}/userbucket/${reduxState.id}`, {...createBucket})
                                .then(res => res)
                                .catch(err => err.response)
        if(resp.status === 201){
            updateBucketList([...bucketList, resp.data])
            setCreateBucket({bucket_name:''})
        }
    }

    return(
        <div className='bucket-main-container'>
            <div className='bucket-create-container'>
                <input type='text' onChange={handleBucketName} value={createBucket.bucket_name}></input>
                <button onClick={handleBucketCreate}>Create</button>
            </div>
            {renderTemplate()}
        </div>
    )
}

export default HomeComponent;