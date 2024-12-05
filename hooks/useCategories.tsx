import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCategories = async () => {
    const response = await axios.get('https://rasadent-webservice-userpanel.liara.run/api/categories');
    return response.data.data;
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })
};