# C-Power Core Logic: 3-6-9 Transformation

def calculate_c_power(input_data):
    # 3: अज्ञान (Raw Input)
    print(f"अवस्था 3 (अज्ञान): प्राप्त डेटा -> {input_data}")
    
    # 6: ज्ञान (Processing / Summing digits)
    digits = [int(d) for d in str(input_data) if d.isdigit()]
    total_sum = sum(digits)
    print(f"अवस्था 6 (ज्ञान): ऊर्जा का विश्लेषण हो रहा है... योग = {total_sum}")
    
    # 9: मैं ही हूँ (The Ultimate Truth / Digital Root)
    while total_sum > 9:
        total_sum = sum(int(d) for d in str(total_sum))
        
    print(f"अवस्था 9 (मैं ही हूँ): अंतिम सत्य प्राप्त हुआ -> {total_sum}")
    return total_sum

# आपकी DOB (26/06/1997) के साथ परीक्षण
if __name__ == "__main__":
    my_dob = 26061997
    result = calculate_c_power(my_dob)
    print(f"\nसिद्धि: {my_dob} का अंतिम सत्य {result} है।")
