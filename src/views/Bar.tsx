import * as React from "react";
import axios from "axios";
import md5 from 'js-md5';
import SliceFlieUpload from './slice-file-upload'
import ajax from './slice-file-upload/ajax'
import wordArr from './data';
class Bar extends React.Component {
  files: any[];
  state:any;
  constructor(props) {
    super(props);
    this.files = [];
    this.state = {
      nowData: wordArr.slice(0, 20),
      page: 1,
      pageSize: 20
    }
  }

  onChange = (e) => {
    this.files = e.target.files;

    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = function (event) {
      let obj: any = (event.target as any).result;
      console.log(md5(obj), "lll")
    }

  }
  onClick2 = () => {
    ajax({
      url: '/api/upload',
      data: {
        file: this.files[0],
        name: 'dsdfsd'
      },
    }).then((res) => {
      console.log(res)
    })
  }
  onClick = () => {
    // ajax({
    //   url:'/api/upload',
    //   data:{
    //     file : this.files[0],
    //     name:'dsdfsd'
    //   },
    // }).then((res)=>{
    //   console.log(res)
    // })
    // return ;
    // let form = new FormData();
    // if (!this.files || !this.files.length) return;
    // form.append('file', this.files[0])
    // form.append('name', 'this.files[0]')
    // // console.log(form)
    // let config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // };
    // axios.post('/api/upload', form, config)
    //   .then(res => {
    //     console.log(res)
    //   })
    // console.log(this.files[0],"kkkkkk")
    // return ;
    let data = new SliceFlieUpload({
      file: this.files[0],
      url: '/api/upload'
    })
  }
  prvClick = () => {

  }
  nextClick = () => {
    const { page, pageSize } = this.state;
    this.setState({
      nowData: wordArr.slice((page - 1) * pageSize, page * pageSize),
      page: page + 1
    })
  }
  onLoad =(e)=>{
   
    // e.terget.document.styleSheets[0].addRule(".abc","color:#FF0000")
    // console.log('99999',e.target.contentWindow)
  }
  render() {
    const {nowData} = this.state;
    return (
      <div>

        {/* <input onChange={this.onChange} type="file" name="logo" />
        <div onClick={this.onClick}>提交</div> */}
        {/* <div onClick={this.onClick2}>提交2</div> */}
        {
          nowData.map((item, index) => {
            // let src = `http://localhost:3000/api/gethtml?file=${}`
            return <iframe onLoad={this.onLoad} style={{ width: '100%', height: '300px' }} key={index} src={`//img-test.aixuexi.com/${item}/widget-word.html`}></iframe>
          })
        }
        <button onClick={this.prvClick}>上一页</button>
        <button onClick={this.nextClick}>下一页</button>
      </div>
    );
  }
}

export default Bar;
