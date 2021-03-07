import React from "react";
import "./App.css"

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', password: '',formDetail:[],deletedValue:[],archiveUser:[],selectAll: false,restoreAll: false}
  
  }

  handleInputChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value  });
  }  
  
  handleSubmit = (event) => {
  event.preventDefault();
  if(this.state.name === ""){
    alert("Name required")
  }else if(this.state.email === ""){
    alert("Email required")
  }else if(this.state.password === ""){
    alert("Password required")
  }else if( this.state.name !== "" || this.state.email !== "" || this.state.password !== ""){
    this.setState({
      formDetail: [...this.state.formDetail,{name: this.state.name,email: this.state.email,password: this.state.password}]
    },() =>   localStorage.setItem("formDetail", JSON.stringify(this.state.formDetail))
    )
     this.setState({
      name: "",
      email: "",
      password: ""
    })
  }
  
  }
 
  handleSelectAction = (e) => {
    const value = e.target.name;
    console.log("deletedValue",this.state.deletedValue);
    console.log(value,"value");

    if (e.target.checked) {
      this.setState({
        ...this.state,
        
        deletedValue:[...this.state.deletedValue,value],
      },() => console.log(this.state.deletedValue,"deletedValue"));
      
    } else {
      console.log(this.state.deletedValue);
      const newArr = this.state.deletedValue.filter((data)=> data !== value )

      this.setState({
        ...this.state,
        deletedValue: newArr,
      },() => console.log(newArr,"newArr"));
    }
  };
  handleDelete=()=> {
   
    if(this.state.selectAll){
      const archiveUser = [...this.state.formDetail];
      this.setState({
        formDetail:[],
        deletedValue:[],
        archiveUser:[...this.state.archiveUser,...archiveUser]
      })
    }else{
      const {formDetail,deletedValue} = this.state;
      const archiveUser  = formDetail?.filter((data)=> deletedValue?.includes(data.name));
      this.setState({
        archiveUser,
        
      },()=> this.setState({
        formDetail: formDetail?.filter((data)=>archiveUser?.every((user)=>user.name !==data.name))
      }))
    }
  } 
  handleRestore=()=> {
    if(this.state.selectAll){
      const {deletedValue,archiveUser} = this.state;
      const restoreUser  = archiveUser?.filter((data)=> deletedValue.includes(data.name));
      this.setState({
        formDetail:[...this.state.formDetail,...restoreUser],
        deletedValue:[],
        archiveUser:archiveUser?.filter((data)=>restoreUser?.every((user)=>user.name !==data.name))
  
      })
    }else{
      const formDetail = [...this.state.archiveUser];
    this.setState({
      archiveUser:[],
      formDetail: [...this.state.formDetail,...formDetail]
    })
    }
   
  } 
  selectAll = ()=> {
    this.setState({
      selectAll: true,
      restoreAll: false,
    })
  
  }
  
  restoreAll = ()=> {
    this.setState({
      selectAll: false,
      restoreAll: true,
    })
  }


  render() {
    // let formArray = JSON.parse(localStorage.getItem("formDetail"));
    return (
      <>
      <form onSubmit={this.handleSubmit}>       
          
          <input type="text" value={this.state.name} name="name" placeholder="Name" onChange={this.handleInputChange} />
          <input type="email" value={this.state.email} name="email" placeholder="Email" onChange={this.handleInputChange} />    
          <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handleInputChange} />    
    
        <button type="submit" value="Submit" >Submit</button>
      </form>
  
      
      <div style={{marginBottom: "5rem"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexGrow:"1"}}>
      <h3>Total User</h3>
      <div style={{textAlign:"right",margin: "5px 38px"}}><button type="button" onClick={this.handleDelete}>Delete</button>
</div>
   
</div>
      <div className="table">
      <div className="table-header">
         <div className="row">
         <div className="column">S.No</div>
            <div className="column">Name</div>
            <div className="column">Email</div>
            <div className="column">Password</div>
            <div className="column"><input type="checkbox"  onChange={() => this.selectAll()}/>Action</div>

         </div>
      </div>
      <div className="table-body">   
         {this.state.formDetail?.map((data,index)=>{return (
           <React.Fragment key={index}><div className="column">{index + 1}</div>  <div className="column">{data.name}</div>    <div className="column">{data.email}</div>
           <div className="column">{data.password}</div><input type="checkbox"  name={`${data.name}`} id={`${data.name}`} onChange={(e) => this.handleSelectAction(e)}/></React.Fragment>
         )}
)}
      </div>
   </div>
      </div>
      
   <div>
     <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexGrow:"1"}}>
     <h3>Deleted User</h3>
   <div style={{textAlign:"right",margin: "5px 38px"}}>      <button type="button" onClick={this.handleRestore}>Restore</button>
</div>
     </div>
   
      <div className="table">
      <div className="table-header">
         <div className="row">
         <div className="column">S.No</div>
            <div className="column">Name</div>
            <div className="column">Email</div>
            <div className="column">Password</div>
            <div className="column"><input type="checkbox"  onChange={() => this.restoreAll()}/>Action</div>

         </div>
      </div>
      <div className="table-body">
      {this.state.archiveUser?.map((data,index)=>{return (
           <React.Fragment key={index}><div className="column">{index + 1}</div>  <div className="column">{data.name}</div>    <div className="column">{data.email}</div>
           <div className="column">{data.password}</div><input type="checkbox"  name={`${data.name}`} id={`${data.name}`} onChange={(e) => this.handleSelectAction(e)}/></React.Fragment>
         )}
)}
      </div>
   </div>
   </div>
   
   </>

    );
  }
}

export default RegisterForm