import{Image,View,Text,FlatList,StyleSheet,ActivityIndicator} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api/posts';

export default function App() {
    //useQuery é um hook principal do Tanstack Query
    const { data, isLoading, error,isError,isFetching,refetch } = useQuery({
        queryKey: ['posts'], //chave única para identificar a consulta
        queryFn: fetchPosts, //função que busca os dados
    });

    //Exibe uma ActiviyIndicator enquanto os dados estão sendo carregados
    if(isLoading){
        return <ActivityIndicator size="large" style={styles.center}/>
    }

    //Exibir uma mensagem de erro, se houver falha na requisição
    if(isError){
        return(
            <View style={styles.center}>
                <Text>Error ao buscar os dados</Text>
                <Text>{error.message}</Text>
            </View>
        )
    }

    return(
        <FlatList 
            data={data}  
            //keyExtractor={(item)=>item.id.toString()}
            refreshing={isFetching} //Mostra o spiner durante o refetch
            onRefresh={refetch} //Chamada automática do refetch ao puxar
            renderItem={({item})=>(
                <View style={styles.item}>
                    <Image source={{uri:item.avatar}} width={200} height={200}/>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            )}      
        />
    ) 
}

const styles = StyleSheet.create({
        center:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        item:{
            padding:16,
            borderBottomWidth:1,
            borderBottomColor:'#ccc'
        },
        title:{
            fontWeight:'bold',
            marginBottom:4
        }
    }
)

