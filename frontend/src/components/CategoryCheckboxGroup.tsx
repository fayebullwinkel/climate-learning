import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Category } from "@/types";
import "../css/container/CategoryCheckboxGroup.css";

interface CategoryCheckboxGroupProps {
    categories: Category[];
    onCategoryChange: (selectedCategories: Category[]) => void;
    filterText: string;
}

const CategoryCheckboxGroup: React.FC<CategoryCheckboxGroupProps> = ({ categories, onCategoryChange, filterText }) => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [availableCategories, setAvailableCategories] = useState<Category[]>(categories);

    useEffect(() => {
        setAvailableCategories(categories.filter(cat => !selectedCategories.find(sc => sc.id === cat.id)));
    }, [categories, selectedCategories]);

    const handleCategoryChange = (event: SelectChangeEvent<number[]>) => {
        const selectedCategoryIds = event.target.value as number[];
        const selectedCats = categories.filter(cat => selectedCategoryIds.includes(cat.id));
        setSelectedCategories(selectedCats);
        onCategoryChange(selectedCats);
    };

    const handleDelete = (categoryId: number) => {
        const updatedSelected = selectedCategories.filter(cat => cat.id !== categoryId);
        setSelectedCategories(updatedSelected);
        onCategoryChange(updatedSelected);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" className="category-checkbox-container">
            <p>{filterText}</p>
            <FormControl fullWidth>
                <Select
                    className="category-select"
                    multiple
                    value={selectedCategories.map(cat => cat.id)}
                    onChange={handleCategoryChange}
                    renderValue={() => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selectedCategories.map((cat) => (
                                <Chip
                                    key={cat.id}
                                    label={cat.value}
                                    onDelete={() => handleDelete(cat.id)}
                                    deleteIcon={<CloseIcon />}
                                    size="small"
                                    style={{ margin: 2 }}
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                >
                    {availableCategories.map(category => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CategoryCheckboxGroup;