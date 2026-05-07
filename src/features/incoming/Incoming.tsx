import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import { Alert, Breadcrumb, Button, Heading, Stack, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { usePaginatedIncomings } from "./hooks/usePaginatedIncoming";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { getApiErrorMessage } from "@/lib/errorMessage";
import IncomingTable from "./components/table/IncomingTable";
import IncomingToolbar from "./components/toolbar/IncomingToolbar";



const Incoming = () => {


  const navigate = useNavigate();

  const { 
    data, 
    isPending, 
    error, 
    page, 
    setPage, 
    searchInput, 
    setSearchInput,
    setSort,
  } = usePaginatedIncomings();

  // if (isPending) return <LoadingSpinner />;

  if (error) return (
    <Alert.Root status="error" mt={10}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>
          {getApiErrorMessage(error)}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );

  return (
    <>
    

      <Breadcrumb.Root mb={6}>
        <Breadcrumb.List>
          
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Transaction</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
  
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Incoming</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>

        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Stack
        mb={10} 
        direction={'row'} 
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack>

          <Heading>Incoming</Heading>

          <Text fontSize={'sm'} color={'fg.muted'}>
            View and manage all deliveries
          </Text>

        </Stack>

        <Button  onClick={()=> navigate(`new`)}>
          Create
        </Button>

      </Stack>

      <IncomingToolbar 
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSort={setSort}
      />

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          {data.data?.length === 0 && (
            <ReusableEmptyState />
          )}

          {(data.data ?? []).length > 0 && (
            <IncomingTable
              incomings={data.data ?? []}
              page={page ?? 1}
              setPage={setPage}
              totalPages={data.totalPages}
            />
          )}

        </>
      )}
    
    </>
  )

}

export default Incoming