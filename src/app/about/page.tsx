import Link from 'next/link';

export default function About() {
  return <article className="py-10 container mx-auto prose">
    <h1>About</h1>
    <p>Author: Vincent Nahn</p>

    <p>This is a little <s>fun</s> side project for my Teatime presentation in my Web Information Retrieval Class.</p>
    Visit my <Link href="https://github.com/professionalGriefer/tsinghua-search">Github Repo</Link> for the source code.
  </article>
}
