import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

export default function Header() {

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const [isSticky, setIsSticky] = useState(false)
  const onScroll = useCallback((event) => {
    const { scrollY } = window
    if (scrollY < 52) {
      setIsSticky(false)
    } else {
      setIsSticky(true)
    }
  })


  return (
    <>
      <BasicHeader>
        <div className="flex justify-between w-full max-w-5xl">
          <a href="#" className="m-auto font-bold text-black">All Post</a>
          <a href="#" className="m-auto font-bold text-black">Category</a>
          <a href="#" className="m-auto font-bold text-black">Contect Me</a>
        </div>
      </BasicHeader>
      <StickyHeader isSticky={isSticky}>
        <div className="w-full flex items-center">
          <a href="#" className="mr-auto font-black text-black">👋 LSJ-TECHBLOG</a>
          <a className='mr-2' href="https://pebble-schooner-b3c.notion.site/d4bd5c8bf33947858bf69051400c62c3">
            <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg"
              viewBox="12 0.18999999999999906 487.619 510.941">
              <path
                d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z"
                fill-rule="evenodd" />
            </svg>
          </a>
          <a href="https://github.com/LeeSeungjae00">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30"
              height="30">
              <path
                d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
            </svg>
          </a>
        </div>
      </StickyHeader>
    </>
  )

}


const BlackA = styled.a`
  color : black;
  text-transform : uppercase;
`

const BasicHeader = styled.nav`
position : absolute;
  top : 0;
  padding: 0 1rem;
  height: 52px;
  left: 0;
  width : 100%;
  display : flex;
  align-items : center;
  justify-content : center;
  background-color : white;
`

const StickyHeader = styled.nav`
  position : ${(props) => (props.isSticky ? 'fixed' : 'absolute')};
  top : ${(props) => (props.isSticky ? '0' : '52px')}; ;
  padding: 0 1rem;
  height: 52px;
  left: 0;
  width : 100%;
  display : flex;
  align-items : center;
  -webkit-backdrop-filter: saturate(180%) blur(15px);
  -moz-backdrop-filter: saturate(180%) blur(15px);
  -o-backdrop-filter: saturate(180%) blur(15px);
  backdrop-filter: saturate(180%) blur(15px);
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #ddd;
`