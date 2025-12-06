import styles from "./singlePost.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
// import { getPost } from "@/lib/data";

// Fetch Data with API
const getData = async (slug: number)=>{
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {next:{revalidate: 3600}}) 

    if(!res.ok){
        throw new Error("Something went wrong")
    }

    return res.json()
}

// export const generateMetadata = async ({params}) => {
//     const { slug } = params;
//     const post = await getPost(slug);
    
//     return{
//         title: post.title,
//         description: 'Next.js starter app'
//     }
    
// }

const SinglePostPage = async ({params}: {params: number}) => {
    const {slug} = params;
    
    //Fetch Data with API
    const post = await getData(slug);

    //Fetch Data without API
    // const post = await getPost(slug);

    return (
        <div className={styles.container}>
            {post.img && <div className={styles.imgContainer}>
                <Image src={post.img} alt="" fill />
            </div>}

            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post?.title}</h1>
                <div className={styles.detail}>
                    
                    {post && <Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId = {post.userId}/>
                    </Suspense>}

                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>{post.createdAt.toString().slice(4,16)}</span>
                        {/* <span className={styles.detailValue}>{post.userId}</span> */}
                    </div>
                </div>
                <div className={styles.content}>
                    {post.desc}
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage