

import Link from 'next/link';


export default function Sidebar() {
  return (
    <ul >
      <li >
        <Link href="/notes">All Notes</Link>
      </li>
      <li >
        <Link href="/notes/filter/Work">Work</Link>
      </li>
      <li >
        <Link href="/notes/filter/Personal" >Personal</Link>
      </li>
      <li >
        <Link href="/notes/filter/Study" >Study</Link>
      </li>
    </ul>
  )
}
