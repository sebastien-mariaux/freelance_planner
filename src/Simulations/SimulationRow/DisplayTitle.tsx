
import React from 'react'

interface DisplayTitleProps {
  title: JSX.Element | string
}

export default function DisplayTitle({title}: DisplayTitleProps): JSX.Element {
  if (typeof title === 'string') {
    return <>{title}</>
  } else {
    return title
  }
}