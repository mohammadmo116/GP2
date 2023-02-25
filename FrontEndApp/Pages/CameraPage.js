import React,{useEffect,useState} from 'react'
import axios from "./axios";
import { WebView } from 'react-native-webview'

function CameraPage() {
  const [link, setLink] = useState('');

  useEffect(() => {
    axios()
    .get("/link")
    .then((response) => {
      setLink(response.data.link)
       console.log(response.data.link)
  
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
    },[])
  
  return (
    <WebView
    source={{
      uri:link
    }}
    style={{ marginTop: 20 }}
  />
  )
}

export default CameraPage
