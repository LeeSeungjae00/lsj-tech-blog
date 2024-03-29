/* eslint-disable no-undef */
import path from 'path'
import matter from 'gray-matter'
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
    const res = await notion.pages.retrieve({
        page_id: id
    })

    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);


    return {
        id,
        date: res.created_time,
        icon: res.icon.emoji,
        title: res.properties.Name.title[0].plain_text,
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