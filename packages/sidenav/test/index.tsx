/**
 * @jest-environment jsdom
 * @jsx jsx
 */

import { jsx } from 'theme-ui'
import renderer from 'react-test-renderer'
import { render, cleanup } from '@testing-library/react'
import { Sidenav, Pagination, AccordionNav } from '../src'
import { FunctionComponent } from 'react'

afterEach(cleanup)

const Link: FunctionComponent<{
  href: string
  mdxType: 'a'
}> = (props) => {
  const { children, ...rest } = props
  return <a {...rest}>{children}</a>
}

const Ul: FunctionComponent<{ mdxType: 'ul' }> = (props) => {
  const { children, ...rest } = props
  return <ul {...rest}>{children}</ul>
}

const links = (
  <ul>
    <li>
      <Link mdxType="a" href="/">
        Beep
      </Link>
    </li>
    <li>
      <Link mdxType="a" href="/boop">
        Boop
      </Link>
    </li>
    <li>
      <Link mdxType="a" href="/bop">
        Bop
      </Link>
    </li>
  </ul>
)
const nestedLinks = (
  <ul>
    <li>
      <Link mdxType="a" href="/">
        Beep
      </Link>
    </li>
    <li>
      <Link mdxType="a" href="/boop">
        Boop
      </Link>
    </li>
    <li>
      <Link mdxType="a" href="/bop">
        Bop
      </Link>
      <Ul mdxType="ul">
        <li>
          <Link mdxType="a" href="/bop/hi">
            Hi
          </Link>
        </li>
      </Ul>
    </li>
  </ul>
)

test('Sidenav renders', () => {
  const json = renderer.create(<Sidenav>{links}</Sidenav>).toJSON()
  expect(json).toMatchSnapshot()
})

test('Sidenav renders open', () => {
  const json = renderer.create(<Sidenav open={true}>{links}</Sidenav>).toJSON()
  expect(json).toMatchSnapshot()
})

test('Pagination renders', () => {
  const json = renderer
    .create(<Pagination pathname="/" children={links} />)
    .toJSON()
  expect(json).toMatchSnapshot()
})

test('AccordionNav renders', () => {
  const json = renderer.create(<AccordionNav children={links} />).toJSON()
  expect(json).toMatchSnapshot()
})

test('AccordionNav renders with nested links', () => {
  const json = renderer.create(<AccordionNav children={nestedLinks} />).toJSON()
  expect(json).toMatchSnapshot()
})

test('AccordionNav renders open', () => {
  const json = renderer
    .create(<AccordionNav open={true} children={nestedLinks} />)
    .toJSON()
  expect(json).toMatchSnapshot()
})

test('AccordionNav button toggles open state', () => {
  const root = render(<AccordionNav children={nestedLinks} />)
  const button = root.getByTitle('Expand Section')
  button.click()
  const nested = root.getByText('Hi')
  expect(nested).toBeTruthy()
})
