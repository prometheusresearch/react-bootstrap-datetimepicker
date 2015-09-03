Styled
======

Styled provides a way to produce React components which have predefined styles
applied:

    import Styled from 'styled'

    let styled = Styled({

      header: {
        boxSizing: 'border-box',
        height: 50

        focus: {
          backgroundColor: 'red'
        }
      },

      content: {
        fontSize: '12pt'
      },

      footer: {
        boxSizing: 'border-box'
      }

    })

Then you can use components from `styled` as regular React components:

    class Widget extends React.Component {

      render() {
        return (
          <div>
            <styled.header>
              Hello!
            </styled.header>
            <styled.content>
              ...
            </styled.content>
            <styled.footer>
              Bye!
            </styled.footer>
          </div>
        )
      }
    }

Specify DOM component
---------------------

When defining styled components you can specify which DOM component to use as an
underlying component:

    let styled = Styled({

      header: {
        Component: 'h1',
        boxSizing: 'border-box',
        height: 50
      }
    })

So that `<styled.header />` will render into `<h1 />`.

Theming
-------

TODO

Theming with Rethemeable
------------------------

TODO
