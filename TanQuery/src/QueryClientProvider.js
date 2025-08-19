//Importando os componentes do Tanstack Query
import {QueryClient,QueryClientProvider as TanstackProvider} from '@tanstack/react-query';

//Cria uma instância do QueryClient(controla o cache, refetch,etc.)
const queryClient = new QueryClient();

//Um componente que envolve toda a aplicação
//Vai permitir que qualquer componente filho acesse o QueryClient(tanstack)
export default function QueryClientProvider({children}) {
    return(
        <TanstackProvider client={queryClient}>
            {children}
        </TanstackProvider>
    )
}