import React, {Fragment, useContext, useEffect} from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,

} from 'native-base';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import {setCategories} from '../../store/actions'
import HeaderWrapper from '../Header';
import Category from '../../api/models/category';
const App = () => {
  const {state, dispatch} = useContext(AppContext);
  useEffect(() => {
    const api = new DataService();
    api.getCategories().then(data => {
       dispatch(setCategories(data))
    }).finally(() => {
        console.log("Categories - All Done")
    });
  },[DataService]);

  return (
    <Fragment>
      <Container>
          <HeaderWrapper />
          <Content>
            {state.categories.map((category:Category) => <Text key={category.id}>{category.displayName}</Text>)}
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>E-INA</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    </Fragment>
  );
};
export default App;
