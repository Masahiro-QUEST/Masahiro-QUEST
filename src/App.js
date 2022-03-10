import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import awsExports from './aws-exports';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo} from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import moment from 'moment';
import { BrowserRouter, Route,Link } from 'react-router-dom';
import { Grid, IconButton } from '@material-ui/core';
import {ArrowForward, ArrowBack }from '@material-ui/icons';
import {Page1} from "./Component/page1";
import {Page2} from "./Component/page2";
import {Page3} from "./Component/page3";
import {Page4} from "./Component/page4";
import {Page5} from "./Component/page5";
import {Page6} from "./Component/page6";
import Question7 from "./Component/Q7";
import {Finish} from "./Component/page8";

 
Amplify.configure(awsExports);

  export function App() {
  const { register, handleSubmit, watch, getValues} = useForm()
  const [data, setData] = useState("");
  const [handle, setHandle] = useState("")
  const [mode, setMode] = useState("new");
  const [editData, setEditData] = useState([])
  const [dynamoData, setDynamoData] = useState([])
  const [nameV, setNameV] = useState("")

  const [likertData1, setLikertData1] = useState("");
  const [sampleData, setSampleData] = useState("");
  const [sampleData2, setSampleData2]= useState("");
  

  const [status, setStatus] = useState(1)
  
  var date = moment()
  var today = date.format('YYYY-MM-DD');
  var yesterday = date.subtract(1, 'd').format('YYYY-MM-DD')
  // 今後はログインしたユーザーで絞るフィルターを
  const filter_T = {
    registration: {
      'eq': today 
    }
  }
  const filter_Y = {
    registration: {
      'eq': yesterday
      
    }
  } 

  // 初期化の段階で自動実行
  useEffect(() => {
    if (mode=="edit") {
      setNameV(editData.name)
    }
    else{
      console.log("new")
    }
    
  }, [editData]);

  
  const handleClickNext = () => {
    //addNote(data);
    setStatus(status + 1);
    // ここで条件分岐
    if (status == 8) {
      addNote();
    }

  }

  const handleClickBack = () => {
    //addNote(data);
    setStatus(status - 1);

  }

  const handleChange = (event) => {
    setHandle(event.target.value)
  }

  const addNote = async () => {
    console.log("送信します")
    await API.graphql(graphqlOperation(createTodo, { 
      input:{
        name:"name",
        sex:"sex",
        hobby:"hobby",
        text:sampleData,
        work:likertData1,
        registration:today
      }  
    }));  
  }
  
  return (
  <div class = "main">
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      
      <Header />
        <body>
        {
          status == 1 ? <Page1 setSampleData1 = {setSampleData}/> : 
          status == 2 ? <Page2 setSampleData2 = {setSampleData}/> : 
          status == 3 ? <Page3 setSampleData3 = {setSampleData}/> : 
          status == 4 ? <Page4 setSampleData4 = {setSampleData}/> : 
          status == 5 ? <Page5 setSampleData5 = {setSampleData}/> : 
          status == 6 ? <Page6 setSampleData6 = {setSampleData}/> : 
          status == 7 ? <Question7 setLikertData1 = {setLikertData1}/> : 
          status == 8 ? <Finish /> : ""
          
        }
        <div class="box">
        {
        status != 8 ? <button class="box_imageRight"  onClick={handleClickNext}><img src="https://s3.ap-northeast-1.amazonaws.com/image.png/arrow.svg" height ="50" width="100" /></button> : ""
        }
        {
        status != 1 && status != 8 ? <button class="box_imageLeft"  onClick={handleClickBack}><img src="https://s3.ap-northeast-1.amazonaws.com/image.png/Larrow.svg" height ="50" width="100" /></button> : ""
        }
        </div>
        
        
        </body>


    </form>
  </div>
      
  );
  };
