import styles from "./postCard.module.css"
import Image from "next/image"
import Link from "next/link"
import { post_t } from "@/types"

const PostCard = ({post}: {post: post_t}) => {
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                {/* {post.img && <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" fill className={styles.img} />
                </div>} */}
                <span className={styles.date}>01.01.2024</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.desc}>{post.body}</p>
                <Link className={styles.link} href={`/blog/${post.id}`}>READ MORE</Link>
            </div>
        </div>
    )
}

export default PostCard