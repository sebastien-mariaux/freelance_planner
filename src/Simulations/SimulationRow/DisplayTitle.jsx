
import React from 'react'


export default function DisplayTitle({ title }) {
  if (typeof title === 'string') {
    return <>{title}</>
  } else {
    return title
  }
}