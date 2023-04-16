/* eslint-disable no-undef */
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { serialize } from 'next-mdx-remote/serialize'
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({ auth: 'secret_RlfSOcyzxzyytbtrjksXAUp3kRxsnDDxEo0S0fWGVhq' });
const n2m = new NotionToMarkdown({ notionClient: notion });
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedFileSystemPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$|\.mdx$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })
    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

export async function getSortedNotionPostsData() {
    const databaseId = '7964442ea75a452596b6a141df97cf18';
    const response = await notion.databases.query({ database_id: databaseId });

    return response.results.map(data => {

        return {
            icon: data.icon.emoji,
            title: data.properties.Name.title[0].plain_text,
            date: data.created_time,
            id: data.id,
            categories: data.properties.Categories.multi_select,
        }
    })

}

export async function getAllPostIds() {
    // const fileNames = fs.readdirSync(postsDirectory)

    // return fileNames.map(fileName => x{
    //     return {
    //         params: {
    //             id: fileName.replace(/\.md$|\.mdx$/, '')
    //         }
    //     }
    // })

    const databaseId = '7964442ea75a452596b6a141df97cf18';
    const response = await notion.databases.query({ database_id: databaseId });

    return response.results.map(data => {
        return {
            params: {
                id: data.id,
            }
        }
    })
}




export async function getPostData(id) {
    // const fullMdPath = path.join(postsDirectory, `${id}.md`)
    // const mdExist = fs.existsSync(fullMdPath)
    // if (mdExist) {
    //     const fullPath = path.join(postsDirectory, `${id}.md`)
    //     const fileContents = fs.readFileSync(fullPath, 'utf8')

    //     // Use gray-matter to parse the post metadata section
    //     const matterResult = matter(fileContents)

    //     // Use remark to convert markdown into HTML string
    //     const processedContent = await remark()
    //         .use(html)
    //         .process(matterResult.content)
    //     const contentHtml = processedContent.toString()

    //     // Combine the data with the id and contentHtml
    //     return {
    //         id,
    //         contentHtml,
    //         ...matterResult.data
    //     }
    // } else {
    //     const fullPath = path.join(postsDirectory, `${id}.mdx`)
    //     const fileContents = fs.readFileSync(fullPath, 'utf8')

    //     // Use gray-matter to parse the post metadata section
    //     const matterResult = matter(fileContents)

    //     const mdxSource = await serialize(matterResult.content)

    //     return {
    //         id,
    //         mdxSource,
    //         ...matterResult.data,
    //     }
    // }

    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);


    return {
        id,
        data: mdString
    }

}

export async function createPost({ id, title, date, content }) {
    const fullPath = path.join(postsDirectory, `${id}.md`)

    const data = `---
title : '${title}'
date: '${date}'
---
    
${content}`

    fs.writeFileSync(fullPath, data)
}