export interface taskResponseDto {
    id: number;
    title: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'done';
    dueDate: string;
}