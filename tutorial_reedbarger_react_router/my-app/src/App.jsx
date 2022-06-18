import { 
  Component, 
  useState,
  useEffect
} from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  // Link,
  NavLink,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar></Navbar>
      {/* render prop is used for applying some conditional logic to render 
      one route one component or another */}
      {/* <Route path='/' render={()=><Home></Home>}></Route> */}

      <Switch>
        <Route exact  path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <PrivateRoute path='/hidden' component={Hidden}></PrivateRoute>
        <Route path='/blog/:postSlug' component={BlogPost}></Route>
        
        <Route path="*" component={NotFound}></Route>
        
      </Switch>

      {/* <Route path='/about'>
        <About></About>
      </Route> */}
    </Router>
  );
}
const BlogPost = ()=>{
  const isRouteForBlogPostComp = useRouteMatch('/blog/:postSlug');

  console.log('BlogPost isRouteForBlogPostComp ', isRouteForBlogPostComp);

  const [post, setPost] = useState(null);
  const {postSlug} = useParams();
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts/${postSlug}`)
    .then((res)=>res.json())
    .then((data)=>{
      // console.log('data', data);
      setPost(data)
    })
  },[postSlug])
  if(!post) return null;

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
      </div>
      <div>
        <p>{post.body}</p>
      </div>
    </div>
  )
}

const Hidden = ()=>{
  return <div>hidden</div>
}

const PrivateRoute = ({component:Component, ...rest})=>{
  // console.log('private route function')
  //useAuth is some custom hook to get the current user's auth state
  const isAuth = useAuth();
  // console.log('Private route isAuth', isAuth);
  return(
    <Route
      {...rest}
      render={(props)=>{
        return isAuth? <Component {...props} ></Component>:<Redirect to='/'></Redirect>
      }}
    >

    </Route>
  )
}

function useAuth(){

  const [isAuthenticated, setAuth] = useState(false);
  useEffect(()=>{
    function handleAuthChange(authState){
      setAuth(authState)
    }
    handleAuthChange(true);
    return ()=>{
      handleAuthChange(false);
    }
  })
  return isAuthenticated;
}


const NotFound = ()=>{
  return <div>You have landed on a page that doesnt' exist</div>;
}

const Navbar = () => {
  return (
    <nav>
      <NavLink
        activeStyle={{
          fontWeight:'bold',
          color:'red'
        }}
        to='/'>Home</NavLink>
      <NavLink
        activeClassName='active'
        to='/about'>About</NavLink>
    </nav>
  )
};

const Home = () => {
  return <div>home</div>;
};
const About = () => {
  const history = useHistory();
  console.log(`history.location.pathname `,history.location.pathname);
  const location = useLocation();
  console.log('location.pathname', location.pathname);//

  return (
    <div>
      <div>about</div>
      <div>Location of the page is {history.location.pathname}</div>
      <button onClick={()=>history.push('/')}>Go to home page</button>
    </div>
  )
};
