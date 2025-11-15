// import styles from "./blog.module.css"
import { post_t } from "@/types"
import PostCard from "@/components/postCard/postCard"
// import PostCard from "@/components/postCard/postCard"
// import { getPosts } from "@/lib/data"
import Image from "next/image"

// Fetch Data with API
const getData = async ()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {cache:"no-store"}) //for data constantly changing
    // const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate: 3600}}) //refresh data every 3600 secs

    if(!res.ok){
        throw new Error("Something went wrong")
    }

    return res.json()
}

const BlogPage = async () => {

    //Fetch Data with API
    const posts = await getData();

    //Fetch Data without API
    // const posts = await getPosts();

    return (
        // <div className={styles.container}>
        <div>
            {posts.map((post: post_t) => (
                <div key={post.id}>
                    <PostCard post={post}/>
                </div>
            ))}
            
            {/* <div className={styles.post}>
                <PostCard/>
            </div>
            <div className={styles.post}>
                <PostCard/>
            </div>
            <div className={styles.post}>
                <PostCard/> 
            </div> */}
        </div>
    )
}

export default BlogPage