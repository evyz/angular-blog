import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnChanges{

  readonly GET_NEWS_URL = 'https://ithub-blog.herokuapp.com/api/posts'
  readonly GET_USER_URL = 'https://ithub-blog.herokuapp.com/api/users'

  title = 'evyz';
  selectedNew: any = {};
  activeWindow = false;
  news: any;
  createNewsObj = {
    title: "",
    author: "",
    image: "",
    tags: [],
    createdAt: null,
    updatedAt: null,
    isPublished: false
  }
  
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getNews()
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onEvent(event: any){
    event.stopPropagation();
  }

  getNews(){
    this.http.get(this.GET_NEWS_URL).subscribe((result) =>{
      this.news = result;
    })
  }

  setSelectedNew(item: any){
    if(!item){
      this.selectedNew = {}
      this.activeWindow = false
      return 
    }

    if(item._id){
      this.http.get(this.GET_NEWS_URL + '/' + item._id).subscribe((result: any) =>{
       
        let updArr!: [any]

        // console.log(result)

        // if(result.data && result.data.likes && result.data.likes.length){
        //   for(let like of result.data.likes){
        //     if(like !== ""){
        //       let user = this.http.get(this.GET_USER_URL + like).subscribe((result:any)=> {
        //         updArr.push(user)
        //       })
        //     }
        //   }

        //   let obj = {...this.selectedNew}
        //   obj.likes = updArr

        //   this.selectedNew.likes = obj
        //   console.log('this.selectedNew',this.selectedNew)
        // }
        this.selectedNew = result;
        this.activeWindow = true 

      })
    }
  }

  setActiveWindow(bool: boolean){
    bool = bool || false
    this.activeWindow = bool
  }

  createNews(){
    console.log(this.createNewsObj);
    
    if(this.createNewsObj.title === ""){
      alert("укажите название новости")
      return
    }
    if(this.createNewsObj.author === ""){
      alert('Укажите автора!')
      return
    }
    if(this.createNewsObj.image === ""){
      alert('Укажите ссылку на пикчу')
      return
    }
    // if(this.createNewsObj.)


    alert('Новость была создана!')
    this.createNewsObj.isPublished = true
    this.http.post(this.GET_NEWS_URL + "/add", {...this.createNewsObj}).subscribe(result => {
      this.getNews()
    })

    this.activeWindow = false
  }

  changeState(value: string, event: any){
    if(value === "title"){
      this.createNewsObj.title = event.target.value
    }
    if(value === "author"){
      this.createNewsObj.author = event.target.value
    }
    if(value === "image"){
      this.createNewsObj.image = event.target.value
    }
  }
}
