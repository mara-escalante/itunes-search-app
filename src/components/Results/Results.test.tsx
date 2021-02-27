import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from './Results';

describe('Results component', () => {

  const data = [
    {
      id: 'id-1',
      title: 'Title 1'
    },{
      id:'id-2',
      title: 'Title 2'
    },{
      id:'id-3',
      title: 'Title 3'
    },{
      id:'id-4',
      title: 'Title 4'
    },
  ]

  test('renders correctly', () => {
    render(<Results data={data}/>);
    const pageTitle = screen.getByText('Results List');
    expect(pageTitle).toBeInTheDocument();
  });

  test('renders a message for no results', () => {
    render(<Results data={[]}/>);
    expect(screen.getByText('No results')).toBeInTheDocument();
  })

  test('renders list of results', () => {
    render(<Results data={data}/>);
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 3')).toBeInTheDocument();
  })
})



